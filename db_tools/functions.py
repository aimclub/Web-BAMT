import sqlalchemy

db = sqlalchemy.create_engine("sqlite:///database.db")

db.connect()

table = sqlalchemy.Table(
    "users",
    db.Column("id"),
    db.Column("login"),
    db.Column("token")
)

