import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { Upload } from '../upload.entity';
import { UploadToAwsProvider } from './upload-to-aws.provider';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { UploadFile } from '../interfaces/upload-file.interface';
import { FileTypes } from '../enums/file-types.enum';

@Injectable()
export class UploadsService {
  constructor(
    @InjectRepository(Upload)
    private readonly uploadRepository: Repository<Upload>,
    private readonly uploadToAwsProvider: UploadToAwsProvider,
    private readonly configService: ConfigService,
  ) {}

  public async uploadFile(file: Express.Multer.File) {
    const isValidFileFormat = [
      'image/gif',
      'image/png',
      'image/jpg',
      'image/jpeg',
    ].includes(file.mimetype);

    if (!isValidFileFormat) {
      throw new BadRequestException('File extention is not supported.');
    }

    try {
      const uploadResult = await this.uploadToAwsProvider.fileUpload(file);
      const uploadFile: UploadFile = {
        name: uploadResult.Key,
        path: uploadResult.Location,
        type: FileTypes.IMAGE,
        mime: file.mimetype,
        size: file.size,
      };

      return await this.uploadRepository.save(
        this.uploadRepository.create(uploadFile),
      );
    } catch (error) {
      throw new ConflictException(error.message);
    }
  }
}
