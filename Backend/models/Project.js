import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      trim: true,
    },
    role: {
      type: String,
      default: 'Solo Full-Stack Project',
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    problem: {
      type: String,
      default: '',
      trim: true,
    },
    explainability: {
      type: String,
      default: '',
      trim: true,
    },
    category: {
      type: String,
      required: true,
      enum: ['Full-Stack', 'Web App', 'Mobile App', 'Backend', 'Other'],
      default: 'Full-Stack',
    },
    stack: {
      type: [String],
      default: [],
    },
    technologies: {
      type: [String],
      default: [],
    },
    features: {
      type: [String],
      default: [],
    },
    images: {
      type: [String],
      default: [],
      validate: {
        validator: function (arr) {
          return Array.isArray(arr) && arr.length >= 1 && arr.length <= 6;
        },
        message: 'A project must have between 1 and 6 images.',
      },
    },
    image: {
      type: String,
      default: '',
    },
    githubUrl: {
      type: String,
      default: '',
      trim: true,
    },
    liveUrl: {
      type: String,
      default: '',
      trim: true,
    },
    liveDemoUrl: {
      type: String,
      default: '',
      trim: true,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Auto-generate slug before saving if not provided
projectSchema.pre('save', function (next) {
  if (!this.slug && this.title) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
  }
  next();
});

const Project = mongoose.model('Project', projectSchema);
export default Project;
