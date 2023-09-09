import { useEffect, useState } from 'react';
import { getCSV } from '../utils/utils';
import XLSX from 'xlsx';

/*
    Don't load columns (COLUMN_NAME - INDEX):
    Rodzaj preparatu - 3
    Nazwa poprzedniego produktu - 4
    Gatunki docelowe - 5
    Okres karencji - 6
    Nazwa importera - 18
    Kraj importera - 19
    Podmiot odpowiedzialny w kraju eksportu - 20
    Kraj eksportu - 21
    Ulotka importu równoległego - 24
    Oznakowanie opakowań importu równoległego - 25

    Take only records with Rodzaj preparatu === Ludzki
*/

const UNUSED_INDEXES = [3, 4, 5, 6, 18, 19, 20, 21, 24, 25];
const TYPE = 'Ludzki';

type MedicineDataItem = {
  id: number;
  name: string;
  nameCommon: string;
  power: string;
  form: string;
  procedureType: string;
  permissionNumber: number;
  permissionTime: number | null;
  atcCode: string;
  responsibleSubject: string;
  package: string;
  activeSubstance: string;
  manufacturerName: string;
  country: string;
  leaflet: string | null;
  characteristic: string | null;
};

const GOV_WEBSITE =
  'https://rejestrymedyczne.ezdrowie.gov.pl/api/rpl/medicinal-products/search/public?size=1000&specimenTypeEnum=L?page=0';

const useLoadMedicinesFromWebsite = () => {
  return <></>;
};

export default useLoadMedicinesFromWebsite;
