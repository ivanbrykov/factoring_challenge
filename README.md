# README

This is a factoring example app.

To run the project locally, follow these steps.

1. Install ruby dependencies

```
bundle install
```

2. Install JS dependencies

```
yarn install
```

3. Create and migrate the DB:

```
rails db:drop; rails db:create; rails db:migrate
```

4. Launch the server

```
./bin/dev
```

5. Navigate your browser to http://localhost:3000/ (update the port number according to the output from the previous step)