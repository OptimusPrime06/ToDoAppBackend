import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export type UserDocument = User & Document;

@Schema({
    timestamps: true,           
    collection: 'users',    
})
export class User {
    @Prop({
        type: String,
        default: () => uuidv4(),   
        immutable: true,
    })
    _id: string;

    @Prop({
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    })
    email: string;

    @Prop({
        type: String,
        required: true,
    })
    password: string;

    @Prop({
        type: Date,
        default: () => new Date(),
        immutable: true,
    })
    createdAt: Date;

    @Prop({
        type: Date,
        default: () => new Date(),
    })
    updatedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);