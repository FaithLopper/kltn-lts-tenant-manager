import apiConfig from '@constants/apiConfig';
import { telemetryCategories } from '@constants/masterData';
import { selectTelemetries } from '@selectors/telemetry';
import { setTelemetries } from '@store/actions/telemetry';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import useFetch from './useFetch';

const telemetryTypes = {
    Phishing: telemetryCategories.emailParser,
    'Phishing Report': telemetryCategories.phishingReport,
    'Phishing Report 2': telemetryCategories.phishingReport2,
    'Phishing Report 3': telemetryCategories.phishingReport3,
    'Phishing Report 4': telemetryCategories.phishingReport4,
    DLP: telemetryCategories.dlpParser,
    'Mobile/Web': telemetryCategories.mobileParser,
};

export default function useTelemetry() {
    const { site } = useParams();

    const dispatch = useDispatch();
    const telemetries = useSelector(selectTelemetries);

    const { execute: executeGetTelemetries, loading } = useFetch(apiConfig.telemetry.getList, {
        immediate: false,
        mappingData: ({ data }) => {
            const result = {};
            data.result.forEach((item) => {
                result[telemetryTypes[item.type]] = item;
            });

            dispatch(setTelemetries(result));
        },
    });

    const getTelemetries = () => {
        executeGetTelemetries({
            params: {
                siteId: site,
            },
        });
    };

    useEffect(() => {
        if (Object.keys(telemetries).length === 0) getTelemetries();
    }, []);

    return { telemetries: telemetries, loading, reloadTelemetries: getTelemetries };
}
