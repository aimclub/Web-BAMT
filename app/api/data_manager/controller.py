from flask_restx import Namespace, Resource
from flask import current_app
from flask import request
from utils import project_root

import os
import pandas as pd
from io import StringIO

from .schema import UploadSchema
from .service import update_db, find_dataset_by_user_and_dataset_name, get_number_of_datasets, \
    automapping, get_dataset_meta_by_user, get_dataset_location, get_header_from_csv, check_db_fullness

from app.api.auth.service import find_user_by_username
from json import load

api = Namespace("data_manager", description="operations with data")


@api.route("/upload")
class DataUploaderResource(Resource):
    @api.doc(params={"name": "Dataset name",
                     "owner": "Name of user",
                     "description": "Description of dataset",
                     "content": "Raw file"})
    def post(self):
        """
        Put dataset's link into db.

        Dataset itself is put inside folder of user, into db stores only links
        """

        errors = UploadSchema().validate(request.form)

        if errors:
            return {"message": errors}, 500

        name = request.form["name"]
        owner = request.form["owner"]
        description = request.form["description"]

        if not request.files:
            return {"message": "no files"}, 404

        if not find_user_by_username(owner):
            return {"message": "User not found!"}, 404

        uploaded_file = request.files["content"].read().decode("utf-8")

        if get_number_of_datasets(owner) >= 3:
            return {"message": "The number of datasets can't be greater than 3"}, 405

        if find_dataset_by_user_and_dataset_name(user=owner, name=name):
            return {"message": "The name for dataset must be unique"}, 400

        if not find_user_by_username(username=owner):
            return {"message": "User not found."}, 404

        try:
            df = pd.read_csv(
                StringIO(uploaded_file),
                index_col=0)
        except Exception:
            return {"message": "Cannot read the file"}, 500

        if df.shape[0] >= 5000 or df.shape[1] >= 20:
            return {"message": "User's data is too big!"}, 501

        if "Unnamed: 0" in df.columns:
            return {"message": "Wrong data format"}, 500
        
        if df.empty:
            return {"message": "Convertion Error"}, 404

        mp = automapping(df)

        relpath = os.path.join(owner, name + ".csv")
        dst = os.path.join(current_app.config["DATASETS_FOLDER"], relpath)

        df.to_csv(dst)

        update_db({"name": name, "owner": owner, "location": relpath,
                   "description": description}, mp)

        return {"message": "Success"}, 200


@api.route("/get_datasets")
class DatasetObserverResource(Resource):
    @api.doc(params={'user': 'username'})
    @api.doc(responses={
        500: "User not passed",
        200: """
        {
            {'datasets': {'dataset_name': str, 'description': Text}}
        }
        """
    }
    )

    def get(self):
        """
        Get a list with user's datasets
        """
        user = request.args.get("user")
        ours = load(open(os.path.join(project_root(), "data/our_datasets.json")))
        if not user:
            return {"message": "User not passed"}, 500
        return ours | get_dataset_meta_by_user(user=user)


@api.route("/get_root_nodes")
class RootNodesResource(Resource):
    @api.doc(params={"name": "dataset name",
                     "owner": "user name (if their)"},
             responses={200: "{'root_nodes': List}",
                        404: "Dataset was not found in database."})
    def get(self):
        """
        Return all possible root nodes.

        Note that under vk and hack names we store our datasets.
        If you want to get them, you don't need to pass an owner
        """

        name = request.args.get("name")

        if name == "hack":
            relpath = r"data\hack_processed_with_rf.csv"
            source = project_root()
        elif name == "vk":
            relpath = r"data\vk_data.csv"
            source = project_root()
        else:
            user = request.args.get("owner")
            relpath = get_dataset_location(owner=user, name=name)
            source = current_app.config["DATASETS_FOLDER"]

        if not relpath:
            return {"message": "Dataset wasn't found in database."}, 404

        abspath = os.path.join(source, relpath)

        if os.path.isfile(abspath):
            root_nodes = get_header_from_csv(abspath)
        else:
            return {"message": "Empty location was provided."}, 400


        return {"root_nodes": root_nodes}, 200

@api.route("/check_fullness")
class CheckFullnessResource(Resource):
    def get(self):
        """
        Return True if the upload_folder is the same as the list of locations from the database
        """
        result, diff = check_db_fullness({"datasets":current_app.config["DATASETS_FOLDER"],
                                          "samples": current_app.config["SAMPLES_FOLDER"]})

        if not result:
            return {"message": {"datasets": f"Corrupted records: {diff['datasets']}",
                                "samples":  f"Corrupted records: {diff['samples']}"}}, 500
        else:
            return {"message": "Database is full."}, 200

