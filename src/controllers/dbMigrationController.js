class DBmigrationControler {
  static async fetchDataAndInsert(req, res) {
    try {
      let { table } = req.params;
      let page = 1;
      let hasMoreData = true;

      while (hasMoreData) {
        const response = await fetch(
          `${process.env.OLD_SERVER}/${table}?page=${page}&limit=100`
        );
        const data = await response.json();

        if (data.length === 0) {
          hasMoreData = false;
        } else {
          for (const row of data) {
            await YourModel.create(row);
          }
          page++;
        }
      }

      return res.status(200).json({
        status: "success",
        message: `${table} --- Data migration completed.`,
      });
    } catch (error) {
      return res.status(500).json({ status: "fail", error: error.message });
    }
  }
}
export default DBmigrationControler;
