const supabase = require('../config/supabase'); // your configured supabase client
const pool = require('../config/db'); // your PostgreSQL connection (pg or pool)

// Controller to create a student
exports.createStudentProfile = async (req, res) => {
  try {
    const { student_name, student_email, student_password, student_class_id, student_phone } = req.body;

    // ✅ Step 1: Validate required fields
    if (!student_name || !student_email || !student_password || !student_phone) {
      return res.status(400).json({
        message: 'student_name, student_email, student_password, and student_phone are required.'
      });
    }

    // ✅ Step 2: Create user in Supabase auth.users (with email confirmed)
    const { data: signupData, error: signupError } = await supabase.auth.admin.createUser({
      email: student_email,
      password: student_password,
      email_confirm: true, // email is already confirmed
      user_metadata: {
        display_name: student_name,
        phone_number: student_phone
      }
    });

    if (signupError) {
      console.error('Supabase signup error:', signupError);
      return res.status(500).json({ message: 'Error creating user in Supabase auth.users', error: signupError.message });
    }

    const userId = signupData.user.id;

    // ✅ Step 3: Insert into user_role table
    const userRoleQuery = `
      INSERT INTO user_role (user_id, user_role)
      VALUES ($1, $2)
      RETURNING *;
    `;
    const userRoleValues = [userId, 'STUDENT'];
    const userRoleResult = await pool.query(userRoleQuery, userRoleValues);

    // ✅ Step 4: Insert into students table
    const studentInsertQuery = `
      INSERT INTO students (student_name, student_email, student_class_id, student_phone, user_id)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
    `;
    const studentValues = [
      student_name,
      student_email,
      student_class_id || null, // optional field
      student_phone,
      userId
    ];
    const studentResult = await pool.query(studentInsertQuery, studentValues);

    // ✅ Step 5: Return success response
    return res.status(201).json({
      message: 'Student created successfully',
      user: signupData.user,
      role: userRoleResult.rows[0],
      student: studentResult.rows[0]
    });

  } catch (error) {
    console.error('Error creating student:', error);
    return res.status(500).json({
      message: 'Internal server error',
      error: error.message
    });
  }
};
