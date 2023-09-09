export interface RootObject {
  id: string;
  count: string;
  medicinalProductName: string;
  commonName: string;
  medicinalProductPower: string;
  pharmaceuticalFormName: string;
  registryNumber: string;
  expirationDateString: string;
  subjectMedicinalProductName: string;
  manufacturersDtos: ManufacturersDto[];
  importersDtos: any[];
  procedureTypeName: string;
  specimenType: string;
  activeSubstanceName: string;
  atcCode: string;
  gracePeriod: string;
  characteristicFileName: boolean;
  leafletFileName: boolean;
  packageFileName: boolean;
  parallelImportLeafletFileName: boolean;
  parallelImportPackageMarkingFileName: boolean;
  parallelImportAdditionalDocumentOneFileName: boolean;
  parallelImportAdditionalDocumentTwoFileName: boolean;
  decisionsAttachment: boolean;
  evaluationReport: string;
  reportSummary: string;
  rmpSummary: string;
  targetSpecies: string;
  packaging: string;
  distributor: string;
  euNumber: string;
  accessibilityCategory: string;
  gtin: string;
  parallelPackaging: string;
  parallelDistributor: string;
  parallelEuNumber: string;
  parallelAccessibilityCategory: string;
  parallelGtin: string;
  deletedPackaging: string;
  deletedDistributor: string;
  deletedEuNumber: string;
  deletedAccessibilityCategory: string;
  deletedGtin: string;
}

interface ManufacturersDto {
  subjectName: string;
  countryName: string;
}
