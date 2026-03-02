import mongoose from "mongoose";

const questionSchema = new mongoose.Schema(
  
  {
    text: { type: String, required: true, trim: true },

    options: {
      type: [String],
      required: true,
      validate: {
        validator: (arr) => Array.isArray(arr) && arr.length >= 2,
        message: "options must have at least 2 items",
      },
    },

    keywords: { type: [String], default: [] },

    correctAnswerIndex: {
      type: Number,
      required: true,
      min: 0,
      validate: {
        validator: function (v) {
          /**
           * - create/save: this.options có sẵn (document)
           * - update (findOneAndUpdate): this là Query -> lấy options từ payload update
           */
          const isQuery = typeof this.getUpdate === "function";
          const opts = isQuery
            ? (this.getUpdate().$set?.options ?? this.getUpdate().options)
            : this.options;

          // Nếu update không gửi options thì không check ở đây (tránh false-negative)
          if (!Array.isArray(opts)) return true;

          return Number.isInteger(v) && v >= 0 && v < opts.length;
        },
        message: "correctAnswerIndex must be within options array",
      },
    },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
  },
  { timestamps: true }
);

export default mongoose.model("Question", questionSchema);
