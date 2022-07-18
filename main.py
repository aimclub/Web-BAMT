from app import create_app, db

if __name__ == "__main__":
    app = create_app()
    # print(app.url_map)
    db.create_all(app=app)
    app.run(debug=True)