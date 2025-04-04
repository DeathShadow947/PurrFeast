const supabase = require('../supabaseClient');

exports.getAllProducts = async (req, res) => {
  const { data, error } = await supabase
    .from('products')
    .select('*');

  if (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server Error' });
  }

  res.json(data);
};