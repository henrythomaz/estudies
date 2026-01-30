import Mail from "../../lib/Mail.js";

class WelcomeEmailJob {
  get key() {
    return "WelcomeEmail";
  }

  async handle({ data }) {
    const { name, email } = data;

    Mail.send({
      to: "henrythcampos@gmail.com", // ⚠️ no free, tem que ser SEU email
      subject: `Bem vindo(a) - ${email}`,
      html: `<h1>Olá ${name}.</h1><p>Bem-vindo(a) ao sistema!</p>`,
      text: `Olá ${name}, bem-vindo(a) ao sistema!`,
    });
  }
}

export default new WelcomeEmailJob();
