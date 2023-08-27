import {Body, Controller, Get, Param, Post, UploadedFile, UseInterceptors} from "@nestjs/common";
import {ProductsService} from "./products.service";
import {CreateProductDto} from "./dto/create-product,dto";
import {FileInterceptor} from "@nestjs/platform-express";

@Controller('products')
export class ProductsController {
    constructor(private productService: ProductsService) {
    }

    @Post()
    @UseInterceptors(FileInterceptor('image'))
    createProduct(@Body() dto: CreateProductDto,
                  @UploadedFile() image) {
        return this.productService.create(dto, image);
    }

    @Get()
    getAll() {
        return this.productService.findAll();
    }

    @Get('/:title')
    getByTitle(@Param() title: string) {
        return this.productService.findByTitle(title);
    }

    @Get('/:id')
    getById(@Param('id') id: number) {
        return this.productService.findById(id);
    }
}