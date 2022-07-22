import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  HttpCode,
  BadRequestException,
} from '@nestjs/common';
import { TracksService } from './tracks.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { validate } from 'uuid';

@Controller('track')
export class TracksController {
  constructor(private readonly tracksService: TracksService) {}

  @Post()
  @HttpCode(201)
  create(@Body() createTrackDto: CreateTrackDto) {
    return this.tracksService.create(createTrackDto);
  }

  @Get()
  @HttpCode(200)
  findAll() {
    return this.tracksService.findAll();
  }

  @Get(':id')
  @HttpCode(200)
  findOne(@Param('id') id: string) {
    if (validate(id)) {
      return this.tracksService.findOne(id);
    } else {
      throw new BadRequestException();
    }
  }

  @Put(':id')
  @HttpCode(200)
  update(@Param('id') id: string, @Body() updateTrackDto: UpdateTrackDto) {
    if (validate(id)) {
      return this.tracksService.update(id, updateTrackDto);
    } else {
      throw new BadRequestException();
    }
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string) {
    if (validate(id)) {
      return this.tracksService.remove(id);
    } else {
      throw new BadRequestException();
    }
  }
}
