module.exports = {
  async up(queryInterface) {
    await queryInterface.removeConstraint(
      "contacts",
      "contacts_cusomer_id_fkey",
    );
    await queryInterface.renameColumn("contacts", "cusomer_id", "customer_id");
    await queryInterface.addConstraint("contacts", {
      fields: ["cusomer_id"],
      type: "foreign key",
      name: "contacts_customer_id_fkey",
      references: {
        table: "customers",
        field: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });
  },

  async down(queryInterface) {
    await queryInterface.removeConstraint(
      "contacts",
      "contacts_customer_id_fkey",
    );
    await queryInterface.renameColumn("contacts", "customer_id", "cusomer_id");
    await queryInterface.addConstraint("contacts", {
      fields: ["cusomer_id"],
      type: "foreign key",
      name: "contacts_cusomer_id_fkey",
      references: {
        table: "customers",
        field: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });
  },
};
