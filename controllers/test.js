const supabase = require('../db/supabase');

const testConnection = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('id')
      .limit(1);

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    return res.json({ message: 'Connection successful' });

  } catch (err) {
    return res.status(500).json({ error: 'Server error' });
  }
};

module.exports = testConnection;
