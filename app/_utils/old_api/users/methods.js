import { check } from "meteor/check";

Meteor.methods({
  "user.register"(data) {
    check(data, { email: String, password: String });

    Accounts.createUser({
      email: data.email,
      password: data.password,
    });
  },
});
