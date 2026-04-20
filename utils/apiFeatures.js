class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }
  customFiltering(obj) {
    const excludedFields = ["sort", "fields", "page", "limit"];
    excludedFields.forEach((key) => delete obj[key]);
    const operators = ["gt", "gte", "lt", "lte", "in"];
    const result = {};
    for (const key in obj) {
      if (typeof obj[key] === "object") {
        result[key] = {};
        for (const op in obj[key]) {
          if (operators.includes(op)) {
            if (op === "in") {
              result[key][`$${op}`] = obj[key][op].split(",");
            } else {
              if (!Number.isNaN(Number(obj[key][op]))) {
                result[key][`$${op}`] = Number(obj[key][op]);
              }
            }
          }
        }
      } else {
        result[key] = obj[key];
      }
    }
    return result;
  }

  filter() {
    const queryObj = { ...this.queryString };
    const criteria = this.customFiltering(queryObj);
    this.query = this.query.find(criteria);
    return this;
  }

  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(",").join(" ");
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort("year");
    }
    return this;
  }

  fieldLimiting() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(",").join(" ");
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select("title author year");
    }
    return this;
  }

  pagination() {
    const page = this.queryString.page * 1 || 1;
    const limit = Math.min(this.queryString.limit * 1 || 10, 20);
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}

export default APIFeatures;
