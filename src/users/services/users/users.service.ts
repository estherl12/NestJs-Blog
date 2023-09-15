import {
  FileTypeValidator,
  Injectable,
  ParseFilePipe,
  UploadedFile,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Observable } from 'rxjs/internal/Observable';
import { blogEntity } from 'src/models/user.entity';
import { bloginterface } from 'src/models/user.interface';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(blogEntity)
    private readonly blogRepository: Repository<blogEntity>,
  ) {}

  createBlog(blog: bloginterface): Promise<bloginterface> {
    return this.blogRepository.save(blog);
  }

  findAll(): Promise<bloginterface[]> {
    return this.blogRepository.find();
  }

  findOne(id: number): Promise<bloginterface> {
    return this.blogRepository.findOneBy({ id });
  }

  deleteOne(id: number): Promise<any> {
    return this.blogRepository.delete(id);
  }

  async updateOne(id: number, blog: bloginterface): Promise<any> {
    const resultwithCount = await this.blogRepository.findAndCount();

    return this.blogRepository.update(id, blog);
  }
}
