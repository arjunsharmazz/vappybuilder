import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import {
  createCustomSection,
  createEducation,
  createExperience,
  createInitialFormData,
  createProject,
  defaultSectionOrder,
} from '../data/config';

function stamp(partial) {
  return { ...partial, lastSavedAt: new Date().toISOString() };
}

export const useBuilderStore = create(
  persist(
    (set) => ({
      documentType: 'resume',
      activeTemplate: 'modern',
      settings: {
        accentColor: '#3B82F6',
        fontFamily: 'Outfit, system-ui, sans-serif',
        layout: 'split',
      },
      formData: createInitialFormData('resume'),
      sectionOrder: defaultSectionOrder,
      lastSavedAt: new Date().toISOString(),

      setDocumentType: (documentType) =>
        set((state) => {
          const activeTemplate = documentType === 'marriage-biodata' ? 'traditional' : state.activeTemplate;
          return stamp({
            documentType,
            activeTemplate,
            formData: {
              ...state.formData,
              personalInfo: {
                ...state.formData.personalInfo,
                role: createInitialFormData(documentType).personalInfo.role,
                maritalStatus:
                  documentType === 'marriage-biodata' ? state.formData.personalInfo.maritalStatus || 'Single' : state.formData.personalInfo.maritalStatus,
                religion:
                  documentType === 'marriage-biodata' ? state.formData.personalInfo.religion || 'Hindu' : state.formData.personalInfo.religion,
              },
            },
          });
        }),

      setActiveTemplate: (activeTemplate) => set(() => stamp({ activeTemplate })),

      updateSettings: (patch) =>
        set((state) => stamp({ settings: { ...state.settings, ...patch } })),

      updatePersonalInfo: (field, value) =>
        set((state) =>
          stamp({
            formData: {
              ...state.formData,
              personalInfo: { ...state.formData.personalInfo, [field]: value },
            },
          })
        ),

      setPhoto: (photo) =>
        set((state) =>
          stamp({
            formData: {
              ...state.formData,
              photo,
            },
          })
        ),

      updateCollectionItem: (collection, index, field, value) =>
        set((state) => {
          const nextItems = state.formData[collection].map((item, currentIndex) =>
            currentIndex === index ? { ...item, [field]: value } : item
          );

          return stamp({
            formData: {
              ...state.formData,
              [collection]: nextItems,
            },
          });
        }),

      addCollectionItem: (collection) =>
        set((state) => {
          const factories = {
            education: createEducation,
            experience: createExperience,
            projects: createProject,
            customSections: createCustomSection,
          };

          return stamp({
            formData: {
              ...state.formData,
              [collection]: [...state.formData[collection], factories[collection]()],
            },
          });
        }),

      removeCollectionItem: (collection, index) =>
        set((state) =>
          stamp({
            formData: {
              ...state.formData,
              [collection]: state.formData[collection].filter((_, currentIndex) => currentIndex !== index),
            },
          })
        ),

      setSkillsFromText: (value) =>
        set((state) =>
          stamp({
            formData: {
              ...state.formData,
              skills: value
                .split(/\n|,/) 
                .map((item) => item.trim())
                .filter(Boolean),
            },
          })
        ),

      updateSkill: (index, value) =>
        set((state) =>
          stamp({
            formData: {
              ...state.formData,
              skills: state.formData.skills.map((skill, currentIndex) => (currentIndex === index ? value : skill)),
            },
          })
        ),

      addSkill: () =>
        set((state) =>
          stamp({
            formData: {
              ...state.formData,
              skills: [...state.formData.skills, ''],
            },
          })
        ),

      removeSkill: (index) =>
        set((state) =>
          stamp({
            formData: {
              ...state.formData,
              skills: state.formData.skills.filter((_, currentIndex) => currentIndex !== index),
            },
          })
        ),

      setSectionOrder: (sectionOrder) => set(() => stamp({ sectionOrder })),

      resetBuilder: () =>
        set((state) =>
          stamp({
            formData: createInitialFormData(state.documentType),
            sectionOrder: defaultSectionOrder,
            activeTemplate: state.documentType === 'marriage-biodata' ? 'traditional' : 'modern',
          })
        ),
    }),
    {
      name: 'vappybuilder-storage',
      storage: createJSONStorage(() => window.localStorage),
      partialize: (state) => ({
        documentType: state.documentType,
        activeTemplate: state.activeTemplate,
        settings: state.settings,
        formData: state.formData,
        sectionOrder: state.sectionOrder,
        lastSavedAt: state.lastSavedAt,
      }),
    }
  )
);