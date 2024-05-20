export interface DeviceInfo {
	ID: string;
	DeviceName: string;
	DeviceBrand: string;
	APILevel: number;
	AndroidVersion: string;
	Manufacturer: string;
	ProductName: string;
	BatteryLevel: number;
	IsCharging: boolean;
}

export interface AppInfo {
	ID: string;
	Name: string;
	PackageName: string;
	LockStatus: boolean;
	Icon: string;
	TimeUsage: number;
	DateLocked: {
		String: string;
		Valid: boolean;
	};
	TimeStartLocked: {
		String: string;
		Valid: boolean;
	};
	TimeEndLocked: {
		String: string;
		Valid: boolean;
	};

	DateLockedFormatted: string | undefined;
	TimeStartLockedFormatted: string | undefined;
	TimeEndLockedFormatted: string | undefined;
}

export interface ActivityInfo {
	ID: string;
	Name: string;
	PackageName: string;
	Icon: string;
	Description: {
		String: string;
		Valid: boolean;
	};
	DeviceID: string;
	CreatedAt: string;
}
