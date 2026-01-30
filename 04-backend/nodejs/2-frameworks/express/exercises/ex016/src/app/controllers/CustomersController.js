import { Op } from "sequelize";
import { parseISO } from "date-fns";
import * as Yup from "yup";

import Customer from "../models/Customer.js";
import Contact from "../models/Contact.js";

class CustomersController {
  async index(req, res) {
    const {
      name,
      email,
      status,
      createdBefore,
      createdAfter: createdAfter,
      updatedBefore,
      updatedAfter,
      sort,
    } = req.query;

    const page = req.query.page || 1;
    const limit = req.query.limit || 25;

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
    if (status) {
      where = {
        ...where,
        status: {
          [Op.in]: status,
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
        createdAt: {
          [Op.lte]: parseISO(updatedBefore),
        },
      };
    }
    if (updatedAfter) {
      where = {
        ...where,
        createdAt: {
          [Op.gte]: parseISO(updatedAfter),
        },
      };
    }
    if (sort) {
      order = sort.split(",").map((item) => item.split(":"));
    }

    console.log("checou")
    const customers = await Customer.findAll({
      where,
      include: [
        {
          model: Contact,
          attributes: ["id", "status"],
        },
      ],
      order,
      limit,
      offset: limit * page - limit,
    });
    console.log("checou")
    console.log(customers);
    return res.json(customers);
  }

  async show(req, res) {
    const customer = await Customer.findByPk(req.params.id);

    if (!customer) {
      return res.status(404).json();
    }

    return res.json(customer);
  }

  async create(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      status: Yup.string().uppercase(),
    });

    const { body } = req;

    if (!(await schema.isValid(body))) {
      return res.status(400).json({ error: "Error on validate schema." });
    }

    const customer = await Customer.create(body);

    return res.status(201).json(customer);
  }

  async update(req, res) {
    const customer = await Customer.findByPk(req.params.id);

    if (!customer) {
      return res.status(404).json();
    }

    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string(),
      status: Yup.string().uppercase(),
    });

    const { body } = req;

    if (!(await schema.isValid(body))) {
      return res.status(400).json({ error: "Error on validate schema." });
    }

    await customer.update(body);

    return res.json(customer)
  }
  
  async destroy(req, res) {
    const customer = await Customer.findByPk(req.params.id);

    if (!customer) {
      return res.status(404).json();
    }

    await customer.destroy();

    return res.json();
  }
}

export default new CustomersController();
