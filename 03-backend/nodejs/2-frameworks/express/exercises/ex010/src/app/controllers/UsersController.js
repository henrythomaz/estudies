import { Op } from "sequelize";
import { parseISO } from "date-fns";
import * as Yup from "yup";

import User from "../models/User.js";

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
          [Op.ilike]: name,
        },
      };
    }

    if (email) {
      where = {
        ...where,
        email: {
          [Op.ilike]: email,
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

    const data = await User.findAll({
      attributes: { exclude: ["password", "password_hash"] },
      where,
      order,
      limit,
      offset,
    });

    return res.json(data);
  }
  
  async show(req, res) {

    const user = await User.findByPk(req.params.id);

    if (!user) {
      return res.status(404).json();
    }

    const { id, name, email, createdAt, updatedAt } = user;

    return res.json({ id, name, email, createdAt, updatedAt });
  }

  async create(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      password: Yup.string().required().min(8),
      // oneOf obriga um campo ser igual a outro.
      passwordConfirmation: Yup.string().oneOf(
        [Yup.ref("password")],
        "Password must match",
      ),
    });

    if(!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: "Error on validate schema." })
    }

    const { id, name, email, createdAt, updatedAt } = await User.create(req.body);

    return res.status(201).json({ id, name, email, createdAt, updatedAt });
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
          then: (schema) =>
            schema
            .required()
            .oneOf([Yup.ref("password")], "Password must match."),
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

    if(oldPassword &&  !(await user.checkPassword(oldPassword)))  {
      return res.status(401).json({ error: "User password not match" });
    }

    const { id, name, email, createdAt, updatedAt } = await user.update(req.body);

    return res.json({ id, name, email, createdAt, updatedAt })
  }

  async destroy(req, res) {
    const user = await User.findByPk(req.params.id);

    if(!user) {
      return res.status(404).json();
    }

    await user.destroy();

    return res.json();
  }
}

export default new UsersController();
