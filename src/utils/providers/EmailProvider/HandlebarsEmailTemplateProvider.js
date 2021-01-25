import handlebars from "handlebars";
import mjml from "mjml";
import { promises as fs } from "fs";

export default class HandlebarsEmailTemplateProvider {
  async parse({ template, variables }) {
    const templateContent = await fs.readFile(template, { encoding: "utf8" });

    const parseTemplate = handlebars.compile(templateContent);

    const parsedTemplate = mjml(parseTemplate(variables)).html;

    return parsedTemplate;
  }
}
