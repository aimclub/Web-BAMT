from flask_seeder import Seeder

from app.api.data_manager.models import Dataset
import os


class DatasetsSeeder(Seeder):
    def run(self):
        dataset_hack = Dataset(name="hack",
                               owner="dev",
                               location=os.path.join("data", "hack_processed_with_rf.csv"),
                               map={'Tectonic regime': 'str', 'Period': 'str', 'Lithology': 'str',
                                    'Structural setting': 'str', 'Gross': 'float', 'Netpay': 'float',
                                    'Porosity': 'float',
                                    'Permeability': 'float', 'Depth': 'float'})

        dataset_vk = Dataset(name="vk",
                             owner="dev",
                             location=os.path.join("data", "vk_data.csv"),
                             map={'age': 'float', 'sex': 'str', 'has_pets': 'str', 'is_parent': 'str',
                                  'relation': 'str',
                                  'is_driver': 'str', 'tr_per_month': 'float', 'median_tr': 'float',
                                  'mean_tr': 'float'})

        print("Adding dataset: %s" % dataset_hack)
        print("Adding dataset: %s" % dataset_vk)

        self.db.session.add(dataset_hack)
        self.db.session.add(dataset_vk)
