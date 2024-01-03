import mongoose from "mongoose";
const reportSchema = mongoose.Schema(
  {
    district: {
      type: String,

    },
    image: {
      public_id: {
        type: String,
        required: true
      },
      url: {
        type: String,
        required: true
      }

    },
    certificate: {
      public_id: {
        type: String,
        required: true
      },
      url: {
        type: String,
        required: true
      }

    },
    animal: {
      type: String,

    },
    vaccination: {
      type: String,

    },
    email: {
      type: String
    },
    approve: {
      type: Boolean,
      default: false
    },
    adopted: {
      type: Boolean,
      default: false
    },

  },
  {
    timestamps: true,
  }
);

const Report = mongoose.model("Report", reportSchema);
export default Report;