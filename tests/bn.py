import random
import pprint
import requests


# BASE = "http://10.9.14.122:5003"
BASE = "http://127.0.0.1:5000"
d = {"email": "romas", "password": "pass"}
print(requests.post(
    f"{BASE}/api/auth/signup", json=d).text
      )

# print(requests.get(f"{BASE}/api/experiment/get_root_nodes/0").text)
# print(requests.get(f"{BASE}/api/bn_manager/get_BN_names/romas").json())
case_id = 0
# pprint.pprint(requests.get(f"{BASE}/api/example/get_example/1").json())


params = {'scoring_function': 'BIC', "use_mixture": False, "has_logit": True,
          "params": {"init_edges": [("Tectonic regime", "Depth"), ("Period", "Lithology"),
                         ("Structural setting", "Gross"), ("Porosity", "Lithology"),
                         ("Depth", "Netpay"), ("Netpay", "Structural setting")]}}
# params = {"scoring_function": "K2", "use_mixture": False, "has_logit": True}

number = random.randint(0, 100)
# number = 36
query = f"""{BASE}/api/experiment/{d["email"]}/bn_{number}/{case_id}/{params}"""

result = requests.get(query).json()
pprint.pprint(result)
# print(requests.get(f"{BASE}/api/bn_manager/get_equal_edges/roman4/['BN_8', 'BN_9']").json())
# pprint.pprint(requests.get(f"{BASE}/api/bn_manager/get_sample/{d['email']}/bn_{number}/Permeability").json())
# print(requests.get(f"{BASE}/api/bn_manager/get_BN_names/roman").json())
# networks = requests.get(f"""{BASE}/api/bn_manager/get_BN/{d["email"]}""").json()
# pprint.pprint(f"""{BASE}/api/bn_manager/get_BN/{d["email"]}""")
# pprint.pprint(networks)

print(requests.delete(f"{BASE}/api/bn_manager/remove/{d['email']}/bn_5").json())
# print(requests.get(f"{BASE}/api/bn_manager/get_BN_names/roman4").json())
# pprint.pprint(requests.get(f"{BASE}/api/bn_manager/get_sample/{d['email']}/BN_10/Gross").json())
# print("--"*10)
# print(requests.get(f"{BASE}/api/bn_manager/get_BN_names/roman4").json())

# networks = requests.get(f"""{BASE}/api/bn_manager/get_BN/{d['email']}""").json()
# pprint.pprint(networks)
