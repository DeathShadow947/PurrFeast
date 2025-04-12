const supabase = require('../supabaseClient');

// Register a new user
exports.registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { name }
    }
  });

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  const user = data.user;
  console.log("Supabase User:", user); // <--- Add this for debugging

  // Insert into 'users' table for roles etc.
  const { error: insertError } = await supabase
    .from('users')
    .insert([
      {
        id: user.id,
        name,
        email,
        role: 'user'
      }
    ]);

  if (insertError) {
    return res.status(500).json({ error: 'User created but failed to sync to database.' });
  }

  res.status(201).json({ message: 'User registered!', data });
};

// Login an existing user
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) {
    return res.status(401).json({ error: error.message });
  }

  res.status(200).json({ message: 'Login successful!', data });
};
