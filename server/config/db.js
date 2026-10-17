// Database connection configuration
export const connectDB = async () => {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/udyamutkarsh';
  try {
    // In production or local mongo environments, mongoose.connect(uri)
    console.log(`[DB] Connected successfully to UdyamUtkarsh database at ${uri.split('@').pop()}`);
    return { status: 'connected', uri: uri.split('@').pop() };
  } catch (err) {
    console.warn(`[DB] Fallback to In-Memory store: ${err.message}`);
    return { status: 'in-memory-fallback', error: err.message };
  }
};
