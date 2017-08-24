class BaseController {
  constructor(req, res) {
    this.request = req;
    this.response = res;
  }
}

module.exports = BaseController;