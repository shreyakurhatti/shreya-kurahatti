/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type BloodGroup = 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
export type Gender = 'Male' | 'Female' | 'Other';
export type UserRole = 'PATIENT' | 'DOCTOR';

export interface PatientProfile {
  name: string;
  email: string;
  bloodGroup: BloodGroup;
  gender: Gender;
  age: number;
  address: string;
  medicalHistory?: string[];
}

export interface DoctorProfile {
  name: string;
  email: string;
  degree: string;
  specialization: string;
  address: string;
  experience?: number;
}

export interface User {
  id: string;
  role: UserRole;
  profile: PatientProfile | DoctorProfile;
}
