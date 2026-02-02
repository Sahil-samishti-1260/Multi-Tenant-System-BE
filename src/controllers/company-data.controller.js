export const getTopCustomers = async (req, res) => {
  try {
    const result = await req.companyDb.query(
      'SELECT * FROM customers LIMIT 5'
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching top customers:', error);
    res.status(500).json({ error: 'Internal server error fetching customers' });
  }
};

export const getTopProducts = async (req, res) => {
  try {
    const result = await req.companyDb.query(
      'SELECT * FROM products LIMIT 5'
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching top products:', error);
    res.status(500).json({ error: 'Internal server error fetching products' });
  }
};