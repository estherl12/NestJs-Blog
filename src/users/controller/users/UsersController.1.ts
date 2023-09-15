import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Patch,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { extname } from 'path';
import path from 'path';
import { bloginterface } from 'src/models/user.interface';
import { UsersService } from 'src/users/services/users/users.service';
import { uuid } from 'uuidv4';

@Controller('blogs')
@ApiConsumes('multipart/form-data')
export class UsersController {
  SERVER_URL = 'http://localhost:3005/';
  constructor(private blogService: UsersService) {}

  @Post('add')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './files',
        filename: (req, file, callback) => {
          const unique:string = path.parse(file.originalname).name.replace(/\s/g,'')+uuid();
          const extension:string = path.parse(file.originalname).ext;
          const filename = `${unique}${extension}`
          callback(null,filename);
        },
      }),
    }),
  )
  @ApiBody({ type: bloginterface })
  async createBlog(
    @Body() blog: bloginterface,
    @UploadedFile() image: Express.Multer.File,
  ): Promise<bloginterface> {
    blog.image = image.filename;
    return await this.blogService.createBlog(blog);
  }

  @Get('list/:id')
  @ApiConsumes('multipart/form-data')
  findOneblog(@Param('id') id: string): Promise<bloginterface> {
    return this.blogService.findOne(Number(id));
  }

  @Get('list')
  @ApiConsumes('multipart/form-data')
  listAll(): Promise<bloginterface[]> {
    return this.blogService.findAll();
  }

  @Delete(':id')
  deleteOne(@Param('id') id: string): Promise<any> {
    return this.blogService.deleteOne(Number(id));
  }

  //   @Post('upload')
  //   @UseInterceptors(
  //     FileInterceptor('file', {
  //       storage: diskStorage({
  //         destination: './files',
  //         filename: (req, file, callback) => {
  //           const uniqueSuffix =
  //             Date.now() + '-' + Math.round(Math.random() * 1000000000);

  //           const ext = extname(file.originalname);
  //           const filename = `${file.originalname}-${uniqueSuffix}${ext}`;
  //           callback(null, filename);
  //         },
  //       }),
  //     }),
  //   )
  //   uploadFile(@UploadedFile() file: Express.Multer.File) {
  //     console.log(file);

  //     return 'file uploaded';
  //   }
  

  @Patch(':id')
  @ApiConsumes('multipart/form-data')
  updateOne(
    @Param('id') id: string,
    @Body() blog: bloginterface,
  ): Promise<any> {
    return this.blogService.updateOne(Number(id), blog);
  }
}
