# import pandas as pd
def test_upload(client, app):
    # with open("test_types_data.csv") as csvfile:
    # csvfile = pd.read_csv("test_types_data.csv", index_col=0)
    # response1 = client.post("api/data_manager/upload", content_type='application/json',
    #                        data={"file": (csvfile, "test.csv"),
    #                              "name": "mein_test",
    #                              "owner": "test"})

    # response2 = client.post("api/data_manager/upload",
    #                        data={"file": csvfile},
    #                        json={"name": "mein_test2",
    #                              "owner": "test"})
    with open("test_types_data.csv", "rb") as f:
        fr = f.read().decode("utf-8")
        payload = {'content': fr,
                   'name': 'mein_test',
                   "owner": "test"}

        r = client.post(
            "api/data_manager/upload", json=payload)
        print(r.json)
    # assert response1.status_code == 200, response1.json["message"]
    # assert response2.status_code == 200, response2.json["message"]
