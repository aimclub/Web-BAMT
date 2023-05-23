from werkzeug.datastructures import FileStorage

import os


def test_upload(client, app):
    file_correct = FileStorage(
        stream=open("test_types_data.csv", "rb"),
        filename="test_types_data.csv",
    )

    file_without_file = FileStorage(
        filename="test_types_data.csv",
    )

    correct_default = {
        "owner": "test",
        "description": "test dataset"}

    package_without_file = {"content": file_without_file, "name": "no_file.csv"} | correct_default

    package_correct = {
                          "name": "test_dataset",
                          "content": file_correct,
                      } | correct_default

    package_without_content = {"name": "no_user.csv"} | correct_default

    rs = []
    for package in [package_correct, package_without_file, package_without_content]:
        rv = client.post(
            "api/data_manager/upload",
            data=package,
            content_type="multipart/form-data"
        )
        rs.append(rv.status_code)
    assert rs == [200, 422, 404]
    # assert rs[0].status_code == 200

    # database check
    assert "test_dataset" in client.get("api/data_manager/get_datasets", query_string={"user": "test"}).json.keys(), \
        "database recording failed."
    # file system check
    assert os.listdir(os.path.join(app.config["DATASETS_FOLDER"], "test")) == ["test_dataset.csv"], \
        "file recording failed."

    # tear down
    client.delete("api/data_manager/remove_dataset", query_string={"owner": "test", "name": "test_dataset"})


def test_get_datasets(client, app):
    dataset_names = [f"test_dataset{i}" for i in range(3)]
    for name in dataset_names:
        file = FileStorage(
            stream=open("test_types_data.csv", "rb"),
            filename="test_types_data.csv",
        )

        _ = client.post(
            "api/data_manager/upload",
            data={
                "name": name,
                "owner": "test",
                "description": "test dataset",
                "content": file,
            },
            content_type="multipart/form-data"
        )
    response = client.get("api/data_manager/get_datasets", query_string={"user": "test"})
    assert response.status_code == 200
    assert list(response.json.keys())[2:] == dataset_names


def test_remove_dataset(client, app):
    rv = client.delete("api/data_manager/remove_dataset", query_string={"owner": "test", "name": "test_dataset2"})
    assert rv.status_code == 200
    datasets = client.get("api/data_manager/get_datasets", query_string={"user": "test"}).json
    assert "test_dataset2" not in datasets.keys()


def test_get_root_nodes(client, app):
    # ours
    r1 = client.get("api/data_manager/get_root_nodes", query_string={"name": "hack", "owner": "test"})
    r2 = client.get("api/data_manager/get_root_nodes", query_string={"name": "hack"})

    assert r1.status_code == r2.status_code == 200
    # theirs

    r3 = client.get("api/data_manager/get_root_nodes", query_string={"name": "test_dataset1", "owner": "test"})
    r4 = client.get("api/data_manager/get_root_nodes", query_string={"name": "test_dataset1", "owner": "not_user"})

    assert r3.status_code == 200
    assert r4.status_code == 404
