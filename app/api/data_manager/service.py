import os.path

import pandas as pd
from app import db
from flask import current_app

from .models import Dataset
from collections import Counter


def automapping(raw_df: pd.DataFrame):
    map = {}
    for column in range(0, raw_df.shape[1]):
        try:
            val = float(raw_df.iloc[0, column])
            t = "float"
        except:
            t = "str"

        map[raw_df.columns[column]] = t
    return map


def update_db(package, map):
    dataset = Dataset(**package, map=map)

    db.session.add(dataset)
    db.session.commit()


def find_dataset_by_user_and_dataset_name(user: str, name: str) -> Dataset:
    return Dataset.query.filter_by(owner=user, name=name).all()

def remove_dataset_from_database(owner, name):
    rel_path = get_dataset_location(owner, name)
    if not rel_path:
        return None
    abs_path = os.path.join(current_app.config["DATASETS_FOLDER"], rel_path)

    os.remove(abs_path)
    db.session.commit()


def get_dataset_meta_by_user(user):
    return {dataset.name:dataset.description for dataset in Dataset.query.filter_by(owner=user).all()}

def get_number_of_datasets(user: str, ) -> int:
    return len(Dataset.query.filter_by(owner=user).all())

def get_dataset_location(owner: str, name: str):
    data = Dataset.query.filter_by(owner=owner, name=name).with_entities(Dataset.location).first()
    if data:
        return data["location"]

def get_header_from_csv(file):
    return pd.read_csv(file, index_col=0, nrows=0).columns.tolist()

def check_db_fullness(folders_mapped: dict):
    """
    Function checks if database and files relations are corrupted.
    :return:
    """
    failed = False
    result = {i: {} for i in folders_mapped.keys()}
    for table, upload_folder in folders_mapped.items():
        query = \
        f"""
        SELECT {"location" if table == "datasets" else "sample_loc"} FROM {table}
        {"WHERE id not in (1, 2)" if table == "datasets" else ""};
        """
        db_content = db.session.execute(query).fetchall()
        db_content = [i[0] for i in db_content]
        folder_content = []

        for dirname, dirnames, filenames in os.walk(upload_folder):
            if not dirnames:
                user = os.path.abspath(dirname).split("\\")[-1]
                folder_content.extend([os.path.join(user, file) for file in filenames])

        if not (Counter(folder_content) == Counter(db_content)):
            failed = True
            diff_items = set(db_content) - set(folder_content)
            result[table] = diff_items

    if not failed:
        return True, result
    else:
        return False, result

