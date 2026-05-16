import systemSettingsModel from "./system_setting.model";

import { ISystemSettingQuery, ICreateSystemSettingPayload, IUpdateSystemSettingPayload } from "./system_setting.type";

const ALLOWED_FIELDS = ["setting_key", "setting_value", "description", "updated_by"];

class SystemSettingsService {
	async createSystemSetting(payload: ICreateSystemSettingPayload) {
		const existing = await systemSettingsModel.findByKey(payload.setting_key);
		if (existing) throw new Error("Setting key already exists");

		return systemSettingsModel.create({
			setting_key: payload.setting_key,
			setting_value: payload.setting_value,
			description: payload.description ?? null,
			updated_by: payload.updated_by ?? null,
		});
	}

	async getSystemSettings(query: ISystemSettingQuery) {
		return systemSettingsModel.findAll(query);
	}

	async getSystemSettingById(id: string) {
		const setting = await systemSettingsModel.findById(id);
		if (!setting) throw new Error("System setting not found");

		return setting;
	}

	async getSystemSettingByKey(setting_key: string) {
		const setting = await systemSettingsModel.findByKey(setting_key);
		if (!setting) throw new Error("System setting not found");

		return setting;
	}

	async updateSystemSetting(id: string, payload: IUpdateSystemSettingPayload) {
		const setting = await systemSettingsModel.findById(id);
		if (!setting) throw new Error("System setting not found");

		if (payload.setting_key && payload.setting_key !== setting.setting_key) {
			const existing = await systemSettingsModel.findByKey(payload.setting_key);
			if (existing) throw new Error("Setting key already exists");
		}

		const cleanPayload = Object.fromEntries(Object.entries(payload).filter(([k]) => ALLOWED_FIELDS.includes(k)));

		return systemSettingsModel.update(id, cleanPayload);
	}

	async deleteSystemSetting(id: string) {
		const setting = await systemSettingsModel.findById(id);
		if (!setting) throw new Error("System setting not found");

		return systemSettingsModel.delete(id);
	}

	async countAll(query: ISystemSettingQuery) {
		return systemSettingsModel.countAll(query);
	}

  async countByKey(setting_key: string) {
    return systemSettingsModel.countByKey(setting_key);
  }
}

export default new SystemSettingsService();
