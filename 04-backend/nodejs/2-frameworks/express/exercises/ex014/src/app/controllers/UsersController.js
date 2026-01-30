import { Op } from "sequelize";
import { parseISO } from "date-fns";
import * as Yup from "yup";

import User from "../models/User.js";

import Mail from "../../lib/Mail.js";

class UsersController {
  async index(req, res) {
    const {
      name,
      email,
      createdBefore,
      createdAfter,
      updatedBefore,
      updatedAfter,
      sort,
    } = req.query;

    const pages = req.query.page || 1;
    const limit = req.query.limit || 25;
    const offset = limit * pages - limit;

    let where = {};
    let order = [];

    if (name) {
      where = {
        ...where,
        name: {
          [Op.iLike]: name,
        },
      };
    }

    if (email) {
      where = {
        ...where,
        email: {
          [Op.iLike]: email,
        },
      };
    }

    if (createdBefore) {
      where = {
        ...where,
        createdAt: {
          [Op.lte]: parseISO(createdBefore),
        },
      };
    }

    if (createdAfter) {
      where = {
        ...where,
        createdAt: {
          [Op.gte]: parseISO(createdAfter),
        },
      };
    }

    if (updatedBefore) {
      where = {
        ...where,
        updatedAt: {
          [Op.lte]: parseISO(updatedBefore),
        },
      };
    }

    if (updatedAfter) {
      where = {
        ...where,
        updatedAt: {
          [Op.gte]: parseISO(updatedAfter),
        },
      };
    }

    if (sort) {
      order = sort.split(",").map((item) => item.split(":"));
    }

    const users = await User.findAll({
      attributes: { exclude: ["password", "password_hash"] },
      where,
      order,
      limit,
      offset,
    });

    console.log({ userId: req.userId });

    return res.json(users);
  }
  
  async show(req, res) {
    const user = await User.findByPk(req.params.id, {
      attributes: { exclude: ["password", "password_hash"] },
    });

    if (!user) {
      return res.status(404).json();
    }


    return res.json(user);
  }

  async create(req, res) {
    const { body } = req;

    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      password: Yup.string().required().min(8),
      passwordConfirmation: Yup.string().oneOf(
        [Yup.ref("password")],
        "Password must match",
      ),
    });

    if (!(await schema.isValid(body))) {
      return res.status(400).json({ error: "Error on validate schema." });
    }

    const { id, name, email, createdAt, updatedAt, file_id } = await User.create(body);

  Mail.send({
    to: "henrythcampos@gmail.com", // ⚠️ no free, tem que ser SEU email
    subject: "Bem vindo(a)",
    html: `<h1>Olá ${name}.</h1><p>Bem-vindo(a) ao sistema!</p>`,
    text: `Olá ${name}, bem-vindo(a) ao sistema!`,
  });

    return res.status(201).json({ id, name, email, createdAt, updatedAt, file_id });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      oldPassword: Yup.string().min(8),
      password: Yup.string().when("oldPassword", {
        is: (val) => !!val,
        then: (schema) => schema.required().min(8),
        otherwise: (schema) => schema.notRequired(),
      }),
      passwordConfirmation: Yup.string().when("password", {
        is: (val) => !!val,
        then: (schema) => schema.required().oneOf([Yup.ref("password")], "Password not match."),
        otherwise: (schema) => schema.notRequired(),
      }),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: "Error on validate schema." });
    }

    const user = await User.findByPk(req.params.id);

    if (!user) {
      return res.status(404).json();
    }

    const { oldPassword } = req.body;

    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res.status(401).json({ error: "User password not match." });
    }

    const { id, name, email, createdAt, updatedAt, file_id } = await user.update(req.body);

    return res.json({ id, name, email, createdAt, updatedAt, file_id });
  }
  async destroy(req, res) {
    const user = await User.findByPk(req.params.id);

    if (!user) {
      return res.status(404).json();
    }

    await user.destroy();

    return res.json();
  }
}

export default new UsersController();
