import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CityEntity } from 'src/city/entities/city.entity';
import { Repository } from 'typeorm';
import { Cache } from 'cache-manager';
import { CacheService } from 'src/cache/cache.service';
import { error } from 'console';
import { NotFoundError } from 'rxjs';

@Injectable()
export class CityService {

    constructor(
        @InjectRepository(CityEntity)
        private readonly cityRepository: Repository<CityEntity>,

        private readonly cacheService: CacheService,
    ) { };

    async getAllCitiesByStateId(stateId: number): Promise<CityEntity[]> {
        return this.cacheService.getCache<CityEntity[]>(`state_${stateId}`, () => 
            this.cityRepository.find({
                where: {
                    stateId,
                }
            })
        );
    };

    async findCityById(cityId: number): Promise<CityEntity> {
        const city = await this.cityRepository.findOne({
            where: {
                id: cityId
            }
        })

        console.log(city);

        if (!city) {
            throw new NotFoundException(`CityID <${cityId}> Not Found!`);
        }

        return city;
    };
}
