// src/components/mentorship/MentorshipForm.jsx
import React, { useState } from 'react';
import { leagueOptions, specializationOptions } from '../../data/mentorshipData';

const MentorshipForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    role: 'mentee', // default: looking for mentors
    roboticsLeague: '',
    specializations: [],
    areasNeedingHelp: [],
    preferredMenteeLeague: [],
    teamExperience: 'Beginner',
    virtualOnly: false,
    location: '',
    description: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData({
      ...formData,
      [name]: checked
    });
  };

  const handleMultiSelectChange = (e, field) => {
    const options = [...e.target.options];
    const selectedValues = options
      .filter(option => option.selected)
      .map(option => option.value);

    setFormData({
      ...formData,
      [field]: selectedValues
    });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.roboticsLeague) {
      newErrors.roboticsLeague = "Please select your robotics league";
    }

    if (formData.role === 'mentor' && formData.specializations.length === 0) {
      newErrors.specializations = "Please select at least one specialization";
    }

    if (formData.role === 'mentor' && formData.preferredMenteeLeague.length === 0) {
      newErrors.preferredMenteeLeague = "Please select at least one preferred mentee league";
    }

    if (formData.role === 'mentee' && formData.areasNeedingHelp.length === 0) {
      newErrors.areasNeedingHelp = "Please select at least one area where you need help";
    }

    if (!formData.location) {
      newErrors.location = "Please enter your location";
    }

    if (!formData.description) {
      newErrors.description = "Please provide a brief description";
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-yellow-700">
              This form is for teams only. Please fill out this form to find mentorship matches with other robotics teams.
            </p>
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          What is your team looking for?
        </label>
        <div className="mt-1 flex items-center space-x-6">
          <div className="flex items-center">
            <input
              id="mentor"
              name="role"
              type="radio"
              value="mentor"
              checked={formData.role === 'mentor'}
              onChange={handleChange}
              className="h-4 w-4 text-yellow-500 focus:ring-yellow-400"
            />
            <label htmlFor="mentor" className="ml-2 block text-sm text-gray-700">
              We want to mentor other teams
            </label>
          </div>
          <div className="flex items-center">
            <input
              id="mentee"
              name="role"
              type="radio"
              value="mentee"
              checked={formData.role === 'mentee'}
              onChange={handleChange}
              className="h-4 w-4 text-yellow-500 focus:ring-yellow-400"
            />
            <label htmlFor="mentee" className="ml-2 block text-sm text-gray-700">
              We are looking for mentors
            </label>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <label htmlFor="roboticsLeague" className="block text-sm font-medium text-gray-700">
            Which robotics league is your team part of?*
          </label>
          <select
            id="roboticsLeague"
            name="roboticsLeague"
            value={formData.roboticsLeague}
            onChange={handleChange}
            className={`mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm rounded-md ${errors.roboticsLeague ? 'border-red-500' : ''}`}
          >
            <option value="" disabled>Select a league</option>
            {leagueOptions.map((league) => (
              <option key={league} value={league.split(' ')[0]}>
                {league}
              </option>
            ))}
          </select>
          {errors.roboticsLeague && <p className="mt-1 text-sm text-red-600">{errors.roboticsLeague}</p>}
        </div>

        {formData.role === 'mentor' ? (
          <div>
            <label htmlFor="preferredMenteeLeague" className="block text-sm font-medium text-gray-700">
              Which leagues would you like to mentor?*
            </label>
            <select
              multiple
              id="preferredMenteeLeague"
              name="preferredMenteeLeague"
              value={formData.preferredMenteeLeague}
              onChange={(e) => handleMultiSelectChange(e, 'preferredMenteeLeague')}
              className={`mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm rounded-md h-32 ${errors.preferredMenteeLeague ? 'border-red-500' : ''}`}
            >
              {leagueOptions.map((league) => (
                <option key={league} value={league.split(' ')[0]}>
                  {league}
                </option>
              ))}
            </select>
            <p className="mt-1 text-xs text-gray-500">Hold Ctrl/Cmd to select multiple</p>
            {errors.preferredMenteeLeague && <p className="mt-1 text-sm text-red-600">{errors.preferredMenteeLeague}</p>}
          </div>
        ) : (
          <div>
            <label htmlFor="teamExperience" className="block text-sm font-medium text-gray-700">
              What is your team's experience level?
            </label>
            <select
              id="teamExperience"
              name="teamExperience"
              value={formData.teamExperience}
              onChange={handleChange}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm rounded-md"
            >
              <option value="Rookie">Rookie (1st year)</option>
              <option value="Beginner">Beginner (1-2 years)</option>
              <option value="Intermediate">Intermediate (3-5 years)</option>
              <option value="Advanced">Advanced (5+ years)</option>
            </select>
          </div>
        )}
      </div>

      {formData.role === 'mentor' ? (
        <div>
          <label htmlFor="specializations" className="block text-sm font-medium text-gray-700">
            What areas can your team mentor in?*
          </label>
          <select
            multiple
            id="specializations"
            name="specializations"
            value={formData.specializations}
            onChange={(e) => handleMultiSelectChange(e, 'specializations')}
            className={`mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm rounded-md h-32 ${errors.specializations ? 'border-red-500' : ''}`}
          >
            {specializationOptions.map((specialization) => (
              <option key={specialization} value={specialization}>
                {specialization}
              </option>
            ))}
          </select>
          <p className="mt-1 text-xs text-gray-500">Hold Ctrl/Cmd to select multiple</p>
          {errors.specializations && <p className="mt-1 text-sm text-red-600">{errors.specializations}</p>}
        </div>
      ) : (
        <div>
          <label htmlFor="areasNeedingHelp" className="block text-sm font-medium text-gray-700">
            What areas does your team need help with?*
          </label>
          <select
            multiple
            id="areasNeedingHelp"
            name="areasNeedingHelp"
            value={formData.areasNeedingHelp}
            onChange={(e) => handleMultiSelectChange(e, 'areasNeedingHelp')}
            className={`mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm rounded-md h-32 ${errors.areasNeedingHelp ? 'border-red-500' : ''}`}
          >
            {specializationOptions.map((specialization) => (
              <option key={specialization} value={specialization}>
                {specialization}
              </option>
            ))}
          </select>
          <p className="mt-1 text-xs text-gray-500">Hold Ctrl/Cmd to select multiple</p>
          {errors.areasNeedingHelp && <p className="mt-1 text-sm text-red-600">{errors.areasNeedingHelp}</p>}
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-700">
            Where is your team located?*
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="City, State"
            className={`mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm ${errors.location ? 'border-red-500' : ''}`}
          />
          {errors.location && <p className="mt-1 text-sm text-red-600">{errors.location}</p>}
        </div>

        <div className="flex items-center h-full pt-6">
          <input
            id="virtualOnly"
            name="virtualOnly"
            type="checkbox"
            checked={formData.virtualOnly}
            onChange={handleCheckboxChange}
            className="h-4 w-4 text-yellow-500 focus:ring-yellow-400 border-gray-300 rounded"
          />
          <label htmlFor="virtualOnly" className="ml-2 block text-sm text-gray-700">
            Virtual mentoring only (no in-person meetings)
          </label>
        </div>
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Tell us more about your team and mentorship goals*
        </label>
        <textarea
          id="description"
          name="description"
          rows={4}
          value={formData.description}
          onChange={handleChange}
          placeholder={formData.role === 'mentor' ? 
            "Describe your team's mentoring experience and what you can offer to mentees..." : 
            "Describe what specific guidance your team is looking for from mentors..."}
          className={`mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm ${errors.description ? 'border-red-500' : ''}`}
        />
        {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
        >
          Find Matches
        </button>
      </div>
    </form>
  );
};

export default MentorshipForm;