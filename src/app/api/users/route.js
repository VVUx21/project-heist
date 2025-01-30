import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI || "mongodb+srv://esummitnitr:Xflkzza6ye13vWTG@cluster2.s9y8u.mongodb.net/?retryWrites=true&w=majority";

// Define schema with new fields
const UserSchema = new mongoose.Schema(
    {
        firstname: String,
        lastname: String,
        email: String,
        isVerified: Boolean,
        image: String,
        transaction_id: String, // Added Transaction ID
        event: [String], // Array of event names
    },
    { collection: "users" }
);

const User = mongoose.models?.User || mongoose.model("User", UserSchema);

export async function GET() {
    try {
        if (mongoose.connection.readyState === 0) {
            await mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        }

        const users = await User.find();
        return Response.json(users);
    } catch (error) {
        return Response.json({ error: "Error fetching users" }, { status: 500 });
    }
}

export async function PUT(req) {
    try {
        const { userId, isVerified } = await req.json();

        if (!mongoose.connection.readyState) {
            await mongoose.connect(MONGODB_URI);
        }

        await User.findByIdAndUpdate(userId, { isVerified });

        return Response.json({ success: true });
    } catch (error) {
        return Response.json({ error: "Error updating user" }, { status: 500 });
    }
}
