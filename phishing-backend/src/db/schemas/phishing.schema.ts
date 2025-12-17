import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export enum PhishingStatus {
    PENDING = 'pending',
    CLICKED = 'clicked',
    EXPIRED = 'expired',
}

export type TPhishingDoc = Phishing & Document;

@Schema({
    timestamps: true,
})
export class Phishing extends Document {
    @Prop()
    email: string;

    @Prop()
    content: string;

    @Prop({ default: PhishingStatus.PENDING, enum: PhishingStatus })
    status: PhishingStatus;
}

export const PhishingSchema = SchemaFactory.createForClass(Phishing);
