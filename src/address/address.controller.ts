import { Controller, Param, Post, UsePipes, ValidationPipe, Body } from '@nestjs/common';
import { AddressService } from './address.service';
import { CreateAddressDto } from './dto/createAddress.dto';
import { AddressEntity } from './entities/address.entity';


@Controller('address')
export class AddressController {

    constructor(private readonly addressService: AddressService) { }

    @Post('/:userId')
    @UsePipes(ValidationPipe)
    async createAddress(
        @Body() createAddressDto: CreateAddressDto,
        @Param('userId') userId: number,
    ): Promise<AddressEntity> {
        return await this.addressService.createAddress(createAddressDto, userId);
    };
}
