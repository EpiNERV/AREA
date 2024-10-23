import mongoose, { Schema, Document } from 'mongoose';

export interface IAccessibility extends Document {
  color_blindness: 'regular' | 'deuteranopia' | 'protanopia' | 'tritanopia' | 'monochromacy'
  color: "zinc" | "slate" | "stone" | "gray" | "neutral" | "red" | "rose" | "orange" | "green" | "blue" | "yellow" | "violet";
  mode: 'light' | 'dark' | 'system';
  language: 'english' | 'french' | 'german' | 'italian' | 'spanish' | 'russian' | 'chinese' | 'japanese' | "korean";
}

const AccessibilitySchema: Schema = new Schema({
    color_blindness: {
        type: String,
        enum: ['regular', 'deuteranopia', 'protanopia', 'tritanopia', 'monochromacy'],
        default: 'regular',
        required: true
    },
    color: {
        type: String,
        enum: ["zinc", "slate", "stone", "gray", "neutral", "red", "rose", "orange", "green", "blue", "yellow", "violet"],
        default: 'neutral',
        required: true
    },
    mode: {
        type: String,
        enum: ['light', 'dark', 'system'],
        default: 'system',
        required: true
    },
    language: {
        type: String,
        enum: ['english', 'french', 'german', 'italian', 'spanish', 'russian', 'chinese', 'japanese', "korean"],
        default: 'english',
        required: true
    },
});

const Accessibility = mongoose.model<IAccessibility>('Accessibility', AccessibilitySchema);
export default Accessibility;
