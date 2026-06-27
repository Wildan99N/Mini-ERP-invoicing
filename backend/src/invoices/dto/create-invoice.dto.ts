import { IsArray, IsDateString, IsEnum, IsNotEmpty, IsNumber, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class InvoiceItemDto {
  @ApiProperty({ example: 'Web Development Services' })
  @IsString()
  @IsNotEmpty()
  description!: string;

  @ApiProperty({ example: 1 })
  @IsNumber()
  quantity!: number;

  @ApiProperty({ example: 1000 })
  @IsNumber()
  unitPrice!: number;
}

export class CreateInvoiceDto {
  @ApiProperty({ example: 1 })
  @IsNumber()
  customerId!: number;

  @ApiProperty({ example: 'INV-2023-001' })
  @IsString()
  @IsNotEmpty()
  invoiceNumber!: string;

  @ApiProperty({ example: '2023-10-01T00:00:00Z' })
  @IsDateString()
  date!: string;

  @ApiProperty({ example: '2023-10-31T00:00:00Z' })
  @IsDateString()
  dueDate!: string;

  @ApiProperty({ type: [InvoiceItemDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => InvoiceItemDto)
  items!: InvoiceItemDto[];
}
