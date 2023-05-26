import pytest

from app.api.experiment.service import DataExtractor
from .conftest import DatasetActions


@pytest.fixture(autouse=True)
def init_datasets(client):
    DatasetActions(client).register_dataset()


def test_extract(app):
    # extract meta
    extractor_our = DataExtractor(dataset="hack")
    extractor_their = DataExtractor(dataset="test_dataset")

    assert not extractor_their.is_our
    assert extractor_our.is_our

    with app.app_context():
        # extract meta
        dataset_meta_our = extractor_our.extract_meta(user="test")
        dataset_meta_their = extractor_their.extract_meta(user="test")

        assert dataset_meta_our, "Failed on extraction of meta for our datasets"
        assert dataset_meta_their, "Failed on extraction of meta for their datasets"
        # extract file
        file_our = extractor_our.extract_file(dataset_meta_our)
        file_their = extractor_their.extract_file(dataset_meta_their)

        assert not file_our.empty, "Failed on extraction of file for our datasets"
        assert not file_their.empty, "Failed on extraction of file for their datasets"
