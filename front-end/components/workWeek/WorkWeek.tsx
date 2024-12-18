import { WorkDayOutput } from '@types';
import React from 'react';
import { useTranslation } from 'react-i18next';
import Workday from './WorkDay';

type Props = {
    workDays: Array<WorkDayOutput>;
};

const Workweek: React.FC<Props> = ({ workDays }: Props) => {
    const { t } = useTranslation();

    return (
        <>
            {workDays && (
                <div className="flex gap-3">
                    {workDays.length ? (
                        workDays.map((workday: WorkDayOutput) => (
                            <Workday key={workday.id} workday={workday} />
                        ))
                    ) : (
                        <p className="text-center text-gray-500">
                            {t('pages.workDays.noWorkdays')}
                        </p>
                    )}
                </div>
            )}
        </>
    );
};

export default Workweek;