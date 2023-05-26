from sklearn import linear_model
from sklearn.ensemble import RandomForestRegressor
from sklearn.linear_model import ElasticNet
from sklearn.neighbors import KNeighborsClassifier
from sklearn.tree import DecisionTreeClassifier
from sklearn.tree import DecisionTreeRegressor

# from sklearn.ensemble import RandomForestClassifier

regressors = \
    {
        "LinearRegression": linear_model.LinearRegression,
        "ElasticNet": ElasticNet,
        "DecisionTreeRegressor": DecisionTreeRegressor,
        "RandomForestRegressor": RandomForestRegressor
    }

classifiers = \
    {
        "LogisticRegression": linear_model.LogisticRegression,
        "KNeighborsClassifier": KNeighborsClassifier,
        "DecisionTreeClassifier": DecisionTreeClassifier,
        # "RandomForestClassifier": RandomForestClassifier
    }

models = regressors | classifiers
