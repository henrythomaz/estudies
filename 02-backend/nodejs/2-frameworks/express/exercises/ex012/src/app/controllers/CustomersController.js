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
      creadedAfter,
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
    if (creadedAfter) {
      where = {
        ...where,
        createdAt: {
          [Op.gte]: parseISO(creadedAfter),
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
}

export default new CustomersController();
