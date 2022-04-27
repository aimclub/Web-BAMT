from app import create_app, db


if __name__ == "__main__":
    app = create_app()
    db.create_all(app=app)
    print(app.url_map)
    app.run(debug=False)