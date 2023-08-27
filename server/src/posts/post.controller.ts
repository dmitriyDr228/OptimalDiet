import {Body, Controller, Get, Post, UploadedFile, UseInterceptors} from "@nestjs/common";
import {PostService} from "./post.service";
import {CreatePostDto} from "./dto/create-post.dto";
import {FileInterceptor} from "@nestjs/platform-express";

@Controller('posts')
export class PostController {
    constructor(private postService: PostService) {
    }

    @Post()
    @UseInterceptors(FileInterceptor('image'))
    create(@Body() dto: CreatePostDto,
           @UploadedFile() image) {
        return this.postService.create(dto, image);
    }


    @Get()
    getAllPosts() {
        return this.postService.findAll();
    }
}