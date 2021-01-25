export default class EmailTemplateProvider {
  async parse({ template, variables }) {
    return { template, variables };
  }
}
